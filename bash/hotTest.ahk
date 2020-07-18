#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
#Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

; React App
; #ifWinActive ahk_class React App
#InstallMouseHook
^j:: 
Sleep, 1000

; View
Click, 140, 45
Sleep, 1000

; Force Reload
Click, 145, 75
Sleep, 3000


; Input
Click, 50, 125
Sleep, 1000

; Demo Data
Click, 800, 76
Sleep, 1000

; Load LIpset
Click, 325, 435
Sleep, 1000

; Correlations
Click, 50, 255
Sleep, 1000

; Correlation button
Click, 240, 95
Sleep, 1000

; Factors
Click, 50, 300
Sleep, 1000
 
; Centroid factors
Click, 325, 95
Sleep, 1000

; Tucker Centroid factors
Click, 520, 255
Sleep, 1000

; Rotation
Click, 50, 355
Sleep, 1000

; ; keep 5 for rot
; Click, 500, 200
; Sleep, 1000

; keep 7 for rot
Click, 650, 200
Sleep, 1000

; submit for rotation
Click, 700, 200
Sleep, 1000

; varimax tab
Click, 300, 80
Sleep, 1000

; Varimax rotation button 
Click, 225, 145
Sleep, 1000

; loadings nav
Click, 50, 415
Sleep, 1000

; Auto-flag
Click, 725, 140
Sleep, 1000

; Send to output
Click, 255, 655
Sleep, 1000

; output nav
Click, 50, 485
Sleep, 1000

; output factor 1
Click, 445, 460
Sleep, 1000


; output factor 2
Click, 520, 460
Sleep, 1000


; output factor 3
Click, 545, 460
Sleep, 1000


; submit factors for output
Click, 1120, 460
Sleep, 1000


; Excel output
Click, 650, 675
Sleep, 1000


; ; Tucker Centroid factors
; Click, 520, 255
; Sleep, 1000


; ; Tucker Centroid factors
; Click, 520, 255
; Sleep, 1000


; ; Tucker Centroid factors
; Click, 520, 255
; Sleep, 1000


return
