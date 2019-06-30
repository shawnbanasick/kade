[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![DOI](http://joss.theoj.org/papers/10.21105/joss.01360/status.svg)](https://doi.org/10.21105/joss.01360)

<img style="float: left;" src="https://github.com/shawnbanasick/kade/blob/master/gifs/heroImage3.png" height="125"/>  

<strong>Download Links:</strong> &nbsp; 
[macOS](https://github.com/shawnbanasick/kade/releases/download/v1.1.0/KADE-1.1.0.dmg) &nbsp;||&nbsp;
[Windows-installer](https://github.com/shawnbanasick/kade/releases/download/v1.1.0/KADE.Setup.1.1.0.exe) &nbsp;||&nbsp;
[Windows-portable](https://github.com/shawnbanasick/kade/releases/download/v1.1.0/KADE.1.1.0.exe) &nbsp;||&nbsp;
[Linux 32-bit](https://github.com/shawnbanasick/kade/releases/download/v1.1.0/KADE.1.1.0.i386.AppImage) &nbsp;||&nbsp;
[Linux 64-bit](https://github.com/shawnbanasick/kade/releases/download/v1.1.0/KADE.1.1.0.AppImage)<br/>

<strong>(See installation instructions below.)</strong>

KenQ Analysis Desktop Edition (KADE) is a desktop application for the analysis of Q methodology data which operates with full functionality on Microsoft Windows, Apple macOS, and Linux operating systems. It has a graphic user interface that makes it easy to use for students or for researchers with a background mainly in qualitative methods. Installation is not required for use; KADE is portable and can be run from a usb flash drive. It includes a variety of interactive visualization tools to explore and analyze Q methodological data.

<br/>

## Change Log
The current version is 1.1.0 (released June 30, 2019). 
New features in this version include:
* user-selectable distinguishing / consensus statement threshold levels 
* interactive distinguishing statement list
* expanded options for auto-flagging factor loadings
* "Update available" in-app notification

<br/>

## Reference Guide

A reference guide and FAQs for each section are available [here.](https://github.com/shawnbanasick/kade/wiki)

<br />

## KADE and PQMethod
Comparisons of KADE and PQMethod results are available [here.](https://github.com/shawnbanasick/kade/wiki/KADE-and-PQMethod)

<br/>

## Start to Finish Demonstration
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/KADE overview.gif" width="500" />

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
### I haven't certified the application with Microsoft, so it will give a warning on first start-up.
1. Double click the downloaded file.
2. In the Windows warning box, click "More info".
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/winWarn.PNG" width="350" />
&nbsp;&nbsp;&nbsp;3. Click "Run Anyway"
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/winOpen.PNG" width="350">

<br/>
<br/>

## Installation Instructions - Apple macOS
### I haven't certified the application with Apple, so it will give you a warning on first start-up.

<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/macWarn.png" width="350">
<br/>

### To avoid this warning, follow these steps to install:

1. Double click the downloaded file.
2. Click and drag the Kade.app icon into the applications folder.
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/iconDrag.png" width="350" />
&nbsp;&nbsp;&nbsp;3. Using Finder, navigate to your Applications folder.<br/>
&nbsp;&nbsp;&nbsp;4. RIGHT click on the Kade.app in Finder.<br/>
&nbsp;&nbsp;&nbsp;5. Select "Open" in the list that appears.
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/openSelect.png" width="350" />
&nbsp;&nbsp;&nbsp;6. Click the "Open" button.
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/openButtonMac.png" width="350" />
This process is only required the first time the application is started. After the first time, the application will start normally.

<br/>
<br/>

## Installation Instructions - Linux
The application is packaged as an "AppImage" so it can be installed on most of the major distributions (Ubuntu, Mint, MXLinux, Debian, openSUSE, RHEL, CentOS, Fedora, etc.) On some distributions it will offer to install the software. 
<br/>

#### After downloading, you will need to change the file permissions of the downloaded file.
1. Right click on the downloaded file.
2. Select "Properties".
3. Select "Permissions". (Example image from debian-based "MXLinux")
<img src="https://github.com/shawnbanasick/kade/blob/master/gifs/linuxPermissions.png" width="350" />
&nbsp;&nbsp;&nbsp;4. Change permissions to executable. (Check "Allow this file to run as a program")<br/>
<strong>Known Issue:</strong> I have not been able to get the icons to package properly in the Linux AppImage, so the ugly default window icons are used now. I am working on a fix for this issue.
<br/>
<br/>

## Contributions and Problems
If you discover a problem with the software or want to make a feature request, please describe it on the issue tracker - https://github.com/shawnbanasick/kade/issues. Contributions are welcome. Make a pull request.

## Attribution
Banasick, (2019). KADE: A desktop application for Q methodology. Journal of Open Source Software, 4(36), 1360, https://doi.org/10.21105/joss.01360 

## License
License: GPL-3


## Open Source Alternatives To KADE:
* [PQMethod](http://schmolck.org/qmethod/)
* [Pensieve R package](https://github.com/maxheld83/pensieve)
* [Qmethod R package](https://cran.r-project.org/package=qmethod)
