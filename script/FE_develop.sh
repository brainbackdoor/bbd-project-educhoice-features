#!/bin/bash

# color variables
txtrst='\e[1;37m' # White
txtred2='\e[1;31m' # Red
txtgrn2='\e[1;32m' # Green
txtylw2='\e[1;33m' # Yellow
txtpur2='\e[1;35m' # Purple

### Utils ###
### Slack Push ###
function post_to_slack () {
  # format message as a code block ```${msg}```
  SLACK_MESSAGE="$1"
  SLACK_SUB_MESSAGE="$3"
  SLACK_LOG="$4"
  SLACK_URL="https://hooks.slack.com/services/[Put In Your Web Hook URL]"

  # Register Emoji of Slack first !!!
  case "$2" in
    S3)
      SLACK_ICON=':s3:'
      ;;
    CLOUDFRONT)
      SLACK_ICON=':cloudfront:'
      ;;
    ERROR)
      SLACK_ICON=':bangbang:'
      ;;
    EC2)
      SLACK_ICON=':ec2:'
      ;;
    GITHUB)
      SLACK_ICON=':github:'
      ;;
    NGINX)
      SLACK_ICON=':nginx:'
      ;;
    *)
      SLACK_ICON=':slack:'
      ;;
  esac
  if [[ $3 ]] || [[ $4 ]]; then
        curl -X POST --data "payload={\"text\": \"${SLACK_ICON} ${SLACK_MESSAGE}\", \"attachments\" : [  { \"color\": \"#36a64f\", \"title\": \"${SLACK_SUB_MESSAGE}\",\"text\" : \"${SLACK_LOG}\"} ]  }" ${SLACK_URL}
  else
        curl -X POST --data "payload={\"text\": \"${SLACK_ICON} ${SLACK_MESSAGE}\"}" ${SLACK_URL}
  fi
}

### Properties ###
dateday=`date +"%Y%m%d"`
datetime=`/bin/date +%Y%m%d-%H%M`

GIT_BRANCH_TAG="DEV"
GIT_REPOSITORY="Put In Your Git URL"
NGINX_URL="Put In Your Nginx URL"
BASE_DIR="Put In Your Base Directory Path"
REPOSITORIES_DIR="$BASE_DIR/[Put In Your Repository Directory Path]"
BACKUP_DIR="$BASE_DIR/[Put In Your Backup Directory Path]"
LOG_DIR="$REPOSITORIES_DIR/logs/$dateday"

PS_NUM=`ps -ef | grep nginx | grep -v 'grep' | awk '{print $2}'`

### BBD Script ver 1.0 (2017.12.19)
## Git pull

echo -e "${txtylw2}=======================================${txtrst}"
echo -e "${txtred2}  << Develop FrontEnd >>${txtrst}"
echo -e "${txtgrn2} 1) Git Pull"
echo -e "${txtylw2}=======================================${txtrst}"

cd $REPOSITORIES_DIR
git pull ${GIT_REPOSITORY} develop
if [ $? -eq 0 ];then
        post_to_slack "[${GIT_BRANCH_TAG}] Git Update Check" "GITHUB"

                ## Yarn Build
                echo -e "${txtylw2}=======================================${txtrst}"
                echo -e "${txtgrn2} 2) Yarn Build"
                echo -e "${txtylw2}=======================================${txtrst}"

                cd $REPOSITORIES_DIR && yarn && yarn build
                if [ $? -eq 0 ];then
                        post_to_slack "[${GIT_BRANCH_TAG}][Success] Yarn Build" "EC2"

                        ### Make Directory of Release
                        echo -e "${txtylw2}=======================================${txtrst}"
                        echo -e "${txtgrn2} 3) Copy for Release"
                        echo -e "${txtylw2}=======================================${txtrst}"

                        mkdir -p $BACKUP_DIR/$datetime
                        post_to_slack "[${GIT_BRANCH_TAG}]Copy for Release" "EC2"
                        cp -r $REPOSITORIES_DIR/build/* $BACKUP_DIR/$datetime/


                        if [ $? -eq 0 ];then
                                ## Excute && Logging
                                echo -e "${txtylw2}=======================================${txtrst}"
                                echo -e "${txtred2} 4) ReStart Nginx"
                                echo -e "${txtylw2}=======================================${txtrst}"
                                post_to_slack "Nginx Restart" "NGINX" "[${GIT_BRANCH_TAG}] ${NGINX_URL}"

                                service nginx restart
                                echo -e "\n Log File Check : tail -f /var/log/syslog"

                        fi

                else
                        post_to_slack "[Fail] Yarn Build" "ERROR" "Check Yarn Build Process"
                fi
else
post_to_slack "[${GIT_BRANCH_TAG}] Git Update Check" "GITHUB" "Git Already up-to-date"
fi