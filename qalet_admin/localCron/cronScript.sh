qaletFolderMaster="/var/qalet/master"
qaletFolderAdmin="/var/qalet/admin"
qaletFolderProxy="/var/qalet/proxy"
qaletFolderSites="/var/qalet/sites"
qaletFolderSetup="/var/qalet/master/setup"
qaletFolderTasks="/var/qalet/tasks"

mkdir -p $qaletFolderMaster && mkdir -p $qaletFolderSites
mkdir -p $qaletFolderTasks && mkdir -p $qaletFolderAdmin && mkdir -p $qaletFolderSetup

mkdir -p "$qaletFolderSetup/log"
cd $qaletFolderSetup && git pull

cp -rf "$qaletFolderSetup/qalet_admin/." "$qaletFolderAdmin/" && rm -fr "$qaletFolderAdmin/Dockerfile"
cp -rf "$qaletFolderSetup/docker-httpd-reverseproxy/." "$qaletFolderProxy/" && rm -fr "$qaletFolderProxy/Dockerfile"

node /var/qalet/admin/localCron/codeUpdate.js >> /var/qalet/log/codeUpdate.js.log
