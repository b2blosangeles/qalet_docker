qaletFolderMaster="/var/qalet/master"
qaletFolderAdmin="/var/qalet/admin"
qaletFolderAdmin="/var/qalet/proxy"
qaletFolderSites="/var/qalet/sites"
qaletFolderSetup="/var/qalet/master/setup"
qaletFolderTasks="/var/qalet/tasks"

mkdir -p $qaletFolderMaster && mkdir -p $qaletFolderSites &&\
mkdir -p $qaletFolderTasks && mkdir -p $qaletFolderAdmin && mkdir -p $qaletFolderSetup

mkdir -p "$qaletFolderSetup/log"
cd $qaletFolderSetup && git pull

cp -rf "$qaletFolderSetup/qalet_admin/." "$qaletFolderAdmin/" && rm -fr "$qaletFolderAdmin/Dockerfile" \
node /var/qalet/localCron/codeUpdate.js >> /var/qalet/log/codeUpdate.js.log
