call npm install

IF EXIST "%DEPLOYMENT_TARGET%\public\bower.json" (

pushd "%DEPLOYMENT_TARGET%\public"

call node_modules\.bin\bower install

IF !ERRORLEVEL! NEQ 0 goto error

popd

)