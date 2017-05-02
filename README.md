# REDLOTUS Update tool

# What is it?
This is an update tool which helps you to convince certain HUAWEI-Phones there is a new update available.

You can call it a "force update" method, or even an alternative to funkyhuawei, if you will. However, unlike the latter
paid option, I can not compete with their excellent support.

## Why should I use use REDLOTUS rather than FunkyHuawei?

* It's free.
* It's open source: Learn and participate, or simply review the existing stuff.
* It's self hosted: Setting foreign DNS to your infrastructure allows them to Man-in-the-middle a lot more than just
  the update-traffic.

## Why should I use FunkyHuawei rather than REDLOTUS?

- FunkyHuawei offers excellent chat support, it's really worth it.
- FunkyHuawei still offers a broader range of features (see roadmap)
- REDLOTUS's audience is developers or experts who know what they're doing.

# What can it do?

- Help you flash *official* Huawei Updates to your working Huawei Phone using Hisuite.
- Help you download the respective firmware to your computer, so that the actual flashing goes faster.

## Roadmap

- Verify the downloaded package using the checksums
- Fully play along with eRecovery, so that we can recover "bricked" phones.

# Usage
## Prerequisities

You'll need a version of node.js installed, I have tested mostly with 7.3.

Also, you'll want to run hisuite on your computer, and make sure your phone recognizes it.

## Preparation

0. Make sure you understand that *you are responsible of what you're doing with your phone*.
1. Check out your local copy of REDLOTUS somewhere on your hard disk
2. Open a terminal in that directory
3. Install the dependencies: `npm install`

## Download a firmware
1. Navigate to the excellent [Huawei Firmware Database by Developer Team MT](http://hwmt.ru/hwmtsite/firmware-database/)
2. Locate the firmware version you'd like to install and copy the URL to filelist.xml to your clipboard
3. Open your terminal again and enter `npm run download <path-to-firmware-xml>` (without &lt;&gt;, of course.
4. Go to bed as huawei's download servers are rather slow.

## Option A: Use HiSuite to update your non-broken phone
1. On the same computer as your HiSuite installation, open Notepad as administrator
2. Click File - Open and navigate to C:\Windows\System32\drivers\etc
3. Select "all files" at the bottom right and choose the file called `hosts`
4. Add a new line: `127.0.0.1 query.hicloud.com` and save
5. Open a terminal in your checkout folder and start REDLOTUS: `npm run listen-hisuite`
6. Start Hisuite, connect your phone. If all went well, it will detect the downloaded firmware as "REDLOTUS". Congratulations!

## Option B: Still working on getting eRecovery to work.
