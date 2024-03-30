[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![DOI](http://joss.theoj.org/papers/10.21105/joss.01360/status.svg)](https://doi.org/10.21105/joss.01360)
![GitHub all releases](https://img.shields.io/github/downloads/shawnbanasick/kade/total?label=Downloads%20%40%20total)
![GitHub release (latest by date)](https://img.shields.io/github/downloads/shawnbanasick/kade/latest/total?label=Downloads%20%40%20latest)

<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/kade-hero-image.png" height="325"/>  
</p>

<strong>Download Links:</strong> &nbsp; 
[macOS](https://github.com/shawnbanasick/kade/releases/download/v1.3.0/KADE-1.3.0.dmg) &nbsp;||&nbsp;
[Windows-installer](https://github.com/shawnbanasick/kade/releases/download/v1.3.0/kade.Setup.1.3.0.exe) &nbsp;||&nbsp;
[Windows-portable](https://github.com/shawnbanasick/kade/releases/download/v1.3.0/kade.1.3.0.exe) &nbsp;||&nbsp;
[Linux](https://github.com/shawnbanasick/kade/releases) <br/>

<strong>(See installation and update instructions below.)</strong>

KenQ Analysis Desktop Edition (KADE) is a desktop application for the analysis of Q methodology data which operates with full functionality on Microsoft Windows, Apple macOS, and Linux operating systems. It has a graphic user interface that makes it easy to use for students or for researchers with a background mainly in qualitative methods. Installation is not required for use; KADE is portable and can be run from a usb flash drive. It includes a variety of interactive visualization tools to explore and analyze Q methodological data.

<br/>

## Change Log
The current version is 1.3.0 (released March 30, 2024). 
Changes in this version include:
* Added DOCX output option
* Added input data book download
* Added nine new user interface languages
* Simplified Excel input file format
* Updated help section content


<br/>

## Reference Guide

A reference guide and FAQs for each section are available [here.](https://github.com/shawnbanasick/kade/wiki)

<br />

## KADE and PQMethod
Comparisons of KADE and PQMethod results are available [here.](https://github.com/shawnbanasick/kade/wiki/KADE-and-PQMethod)

<br/>

## Start to Finish Demonstration
<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/kade_overview_1-2-0.gif" width="500" />
<p>

1. Click the "1. Input" navigation button.
2. Click the "Demo Data" tab.
3. Click the "Load Lipset" button.
4. Click the "2. Data" navigation button and confirm that the data has loaded properly.
5. Click the "3. Correlations" navigation button.
6. Click the "Calculate Correlations" button.
7. Click the "4. Factors" navigation button.
8. Click the "Centroid Factors" button or "Principal Components" button.
9. Click the "5. Rotation" navigation button.
10. Click the dropdown select to choose the number of factors and then click "Submit".
11. Click the "Varimax" tab or the "Judgemental" tab.
12. For Varimax rotation, click the "Varimax Rotation" button.
13. For Judgmental rotation, click the "Initialize Judgmental Rotation" button. Then select two factor buttons and "Display". After rotation click the "Save Rotation" button to make the rotation permanent.
14. Click the "6. Loadings" navigation button.
15. Click the "Auto-Flag" button, or select participant loadings individually.
16. Click the "Send Table Data to Output".
17. Click the "7. Output" button, then click the "Options" tab.
18. Select the factors to output, then click "Submit".
19. Click the "Factor Characteristics", "Factors Table", or "Factor Visualizations" tabs to view analysis results.
20. Click the "Options" tab, then click the "Excel File" button or "CSV File" button to download the analysis results.

<br/>
<br/>

## Installation Instructions - Microsoft Windows
#### I haven't certified the application with Microsoft, so it will give a warning on first start-up.
&nbsp;&nbsp;&nbsp;1. Double click the downloaded file.

&nbsp;&nbsp;&nbsp;2. In the Windows warning box, click the "More info" link in the text at the top of the warning box.
<br/>
<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/winWarn.PNG" width="350" />
</p> 
<br/>
&nbsp;&nbsp;&nbsp;3. Click "Run Anyway"
<br/>
<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/winOpen.PNG" width="350">
</p>
<br/>
<br/>

## Installation Instructions - Apple macOS
#### KADE can be installed following the normal process for macOS.

<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/iconDrag.png" width="350" />
</p>

&nbsp;&nbsp;&nbsp;1. Double click the downloaded file.

&nbsp;&nbsp;&nbsp;2. Click and drag the KADE.app icon into the applications folder.


#### Version 1.2.0 is code signed and notarized by Apple, so there will be only one warning on the first startup after installation.
<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/macOS warning.png" width="350">
<br/>
</p>

#### If you have changed your default settings, you may get this warning:
<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/macos-catalina-alert-not-app-store.jpg" width="350">
<br/>
</p>

#### In this case, to open KADE you will need to reset your security settings to the defaults:
&nbsp;&nbsp;&nbsp;1. Open "System Preferences"

&nbsp;&nbsp;&nbsp;2. Click "Security & Privacy"

&nbsp;&nbsp;&nbsp;3. Click "General"

&nbsp;&nbsp;&nbsp;4. Click the lock in the bottom left and enter your password

&nbsp;&nbsp;&nbsp;5. Under "Allow apps downloaded from:", select "App Store and identified developers"

<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/macos-mojave-system-preferences-security-general-require-disable-dark.jpg" width="350">
<br/>
</p>
<br/>
<br/>

## Installation Instructions - Linux
The application is packaged as an "AppImage" so it can be installed on most of the major distributions (Ubuntu, Mint, MXLinux, Debian, openSUSE, RHEL, CentOS, Fedora, etc.) On some distributions it will offer to install the software. 
<br/>

#### After downloading, you will need to change the file permissions of the downloaded file.
1. Right click on the downloaded file.
2. Select "Properties".
3. Select "Permissions". (Example image from debian-based "MXLinux")
<p align="center">
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/linuxPermissions.png" width="350" />
</p>
&nbsp;&nbsp;&nbsp;4. Change permissions to executable. (Check "Allow this file to run as a program")<br/>
<strong>Known Issue:</strong> I have not been able to get the icons to package properly in the Linux AppImage, so the ugly default window icons are used now. I am working on a fix for this issue.
<br/>
<br/>

## Updates
I have not integrated automatic updating functions into the application. To update you need to uninstall the old version, then download and install the new version.

## Uninstallation Instructions
* In Windows, click the "Start" button, then click "Settings", "Apps", "KADE", and select "uninstall"
* In macOS, use Finder to go to the "applications" folder and delete the KADE application
* In Linux, locate the AppImage file of the old version and delete it.

## Contributions and Problems
If you discover a problem with the software or want to make a feature request, send an email to ken.q.tools@gmail.com. 

## User Interface Translators Welcomed!
If you would like to volunteer to translate the user interface (about 400 words and phrases) into another language, please contact me at ken.q.tools@gmail.com
Thanks to <strong>Nicolás Medina Silva</strong> for the Spanish translation!


## Attribution
Banasick, (2019). KADE: A desktop application for Q methodology. Journal of Open Source Software, 4(36), 1360, https://doi.org/10.21105/joss.01360 

## License
License: GPL-3


## Open Source Alternatives To KADE:
* [PQMethod](http://schmolck.org/qmethod/)
* [Pensieve R package](https://github.com/maxheld83/pensieve)
* [Qmethod R package](https://cran.r-project.org/package=qmethod)
