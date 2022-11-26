:: Assumes running from ration-expiration-date\build
mkdir out\ration-expiration-date\scripts
copy ..\module.json out\ration-expiration-date\
copy ..\scripts\ration-expiration-date.js out\ration-expiration-date\scripts\
cd out
CALL ..\zip-folder ration-expiration-date
rmdir /S /Q ration-expiration-date\
cd ..
explorer out
