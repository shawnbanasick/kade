; ============================================================
;  ClickRecorder.ahk  —  AutoHotkey v2
;  Record, Save, Load, and Playback mouse clicks
;
;  Hotkeys:
;    F1  — Start / Stop recording
;    F2  — Play back recorded clicks
;    F3  — Save recording to file
;    F4  — Load recording from file
;    F5  — Clear current recording
;    Esc — Stop playback early
; ============================================================

#Requires AutoHotkey v2.0
#SingleInstance Force

; ---------- State ----------
global g_recording  := false
global g_playing    := false
global g_clicks     := []          ; array of {button, x, y, delay}
global g_lastTime   := 0
global g_stopPlay   := false

; ---------- Tray icon tooltip ----------
TraySetIcon("shell32.dll", 168)
A_TrayMenu.Delete()
A_TrayMenu.Add("Show Status", (*) => ShowStatus())
A_TrayMenu.Add("Exit",        (*) => ExitApp())

ShowTip("ClickRecorder ready.`nF1=Record  F2=Play  F3=Save  F4=Load  F5=Clear")

; ============================================================
;  F1 — Toggle recording
; ============================================================
F1:: {
    global g_recording, g_clicks, g_lastTime, g_playing
    if g_playing {
        ShowTip("Cannot record while playing back.")
        return
    }
    if !g_recording {
        g_clicks    := []
        g_lastTime  := A_TickCount
        g_recording := true
        ShowTip("Recording started…`nClick anywhere. Press F1 to stop.")
    } else {
        g_recording := false
        ShowTip("Recording stopped.`n" g_clicks.Length " click(s) captured.`nF2=Play  F3=Save")
    }
}

; ============================================================
;  Mouse hooks — capture left, right, middle clicks
; ============================================================
~LButton:: CaptureClick("Left")
~RButton:: CaptureClick("Right")
~MButton:: CaptureClick("Middle")

CaptureClick(button) {
    global g_recording, g_clicks, g_lastTime
    if !g_recording
        return
    now   := A_TickCount
    delay := (g_clicks.Length = 0) ? 0 : (now - g_lastTime)
    g_lastTime := now
    MouseGetPos(&mx, &my)
    g_clicks.Push({ button: button, x: mx, y: my, delay: delay })
}

; ============================================================
;  F2 — Playback
; ============================================================
F2:: {
    global g_clicks, g_playing, g_recording, g_stopPlay
    if g_recording {
        ShowTip("Stop recording first (F1).")
        return
    }
    if g_playing {
        ShowTip("Already playing back.")
        return
    }
    if g_clicks.Length = 0 {
        ShowTip("Nothing recorded yet.`nPress F1 to start recording.")
        return
    }
    g_playing  := true
    g_stopPlay := false
    ShowTip("Playing back " g_clicks.Length " click(s)…`nPress Esc to cancel.")
    SetTimer PlayNext.Bind(1), -10
}

PlayNext(idx) {
    global g_clicks, g_playing, g_stopPlay
    if g_stopPlay || idx > g_clicks.Length {
        g_playing := false
        if g_stopPlay
            ShowTip("Playback cancelled.")
        else
            ShowTip("Playback complete.")
        return
    }
    c := g_clicks[idx]
    waitMs := (idx = 1) ? 0 : c.delay
    if waitMs > 0
        Sleep waitMs
    if g_stopPlay {
        g_playing := false
        ShowTip("Playback cancelled.")
        return
    }
    MouseMove c.x, c.y, 0
    switch c.button {
        case "Left":   Click c.x, c.y
        case "Right":  Click "Right", c.x, c.y
        case "Middle": Click "Middle", c.x, c.y
    }
    SetTimer PlayNext.Bind(idx + 1), -1
}

; ============================================================
;  Esc — Stop playback
; ============================================================
Esc:: {
    global g_stopPlay, g_playing
    if g_playing
        g_stopPlay := true
}

; ============================================================
;  F3 — Save to file
; ============================================================
F3:: {
    global g_clicks, g_recording
    if g_recording {
        ShowTip("Stop recording first (F1).")
        return
    }
    if g_clicks.Length = 0 {
        ShowTip("Nothing to save.")
        return
    }
    path := FileSelect("S16", A_ScriptDir "\recording.crec",
                       "Save Recording", "Click Recording (*.crec)")
    if path = ""
        return
    try {
        f := FileOpen(path, "w", "UTF-8")
        f.WriteLine("; ClickRecorder v2 — " FormatTime(, "yyyy-MM-dd HH:mm:ss"))
        f.WriteLine("; Format: button,x,y,delayMs")
        for c in g_clicks
            f.WriteLine(c.button "," c.x "," c.y "," c.delay)
        f.Close()
        ShowTip("Saved " g_clicks.Length " click(s) to:`n" path)
    } catch as e {
        MsgBox "Save failed: " e.Message, "Error", "Iconx"
    }
}

; ============================================================
;  F4 — Load from file
; ============================================================
F4:: {
    global g_clicks, g_recording, g_playing
    if g_recording || g_playing {
        ShowTip("Stop recording/playback before loading.")
        return
    }
    path := FileSelect(1, A_ScriptDir,
                       "Open Recording", "Click Recording (*.crec)")
    if path = ""
        return
    try {
        newClicks := []
        loop read path {
            line := Trim(A_LoopReadLine)
            if line = "" || SubStr(line, 1, 1) = ";"
                continue
            parts := StrSplit(line, ",")
            if parts.Length < 4
                continue
            newClicks.Push({
                button: parts[1],
                x:      Integer(parts[2]),
                y:      Integer(parts[3]),
                delay:  Integer(parts[4])
            })
        }
        g_clicks := newClicks
        ShowTip("Loaded " g_clicks.Length " click(s) from:`n" path "`nF2=Play")
    } catch as e {
        MsgBox "Load failed: " e.Message, "Error", "Iconx"
    }
}

; ============================================================
;  F5 — Clear recording
; ============================================================
F5:: {
    global g_clicks, g_recording, g_playing
    if g_recording || g_playing {
        ShowTip("Stop recording/playback first.")
        return
    }
    g_clicks := []
    ShowTip("Recording cleared.")
}

; ============================================================
;  Helper — show a tooltip for 3 seconds
; ============================================================
ShowTip(msg) {
    ToolTip msg
    SetTimer () => ToolTip(), -3000
}

ShowStatus(*) {
    global g_clicks, g_recording, g_playing
    state := g_recording ? "Recording" : g_playing ? "Playing" : "Idle"
    MsgBox "Status: " state "`nClicks stored: " g_clicks.Length,
           "ClickRecorder", "Icon!"
}
