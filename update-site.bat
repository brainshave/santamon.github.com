call jekyll

@echo on

xcopy _site\* ..\longstandingbug-target /S /Y /Q

cd ..\longstandingbug-target
call git add .
call git commit -m "Site update from src branch."

cd ..\longstandingbug