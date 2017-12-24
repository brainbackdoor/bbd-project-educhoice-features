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

BASE_DIR="Put In Your Base Directory Path"
REPOSITORIES_DIR="$BASE_DIR/[Put In Your Repository Directory Path]"
BACKUP_DIR="$BASE_DIR/[Put In Your Backup Directory Path]"
LOG_DIR="$REPOSITORIES_DIR/logs/$dateday"
AWS_BACKUP_DIR="s3://[Put In Your BACKUP S3 Bucket Name]/[Path]"
AWS_RELEASE="s3://[Put In Your RELEASE S3 Bucket Name]"
AWS_CLOUDFRONT_ID="Put In Your CloudFront ID"


PS_NUM=`ps -ef | grep nginx | grep -v 'grep' | awk '{print $2}'`

LAST_EC2_BACKUP=`ls ${BACKUP_DIR}  | sort -r | head -n 1`
LAST_AWS_BACKUP=`aws s3 ls ${AWS_BACKUP_DIR} | grep PRE | awk {'print $2'} | sort -r | head -n 1`

### Deploy Function ###
function check_ls () {
        ls -ltr ${BACKUP_DIR}
}
function check_backup () {
        aws s3 ls ${AWS_BACKUP_DIR}/$1 --human-readable --summarize
}
function check_release () {
        aws s3 ls ${AWS_RELEASE}/  --human-readable --summarize
}

function print_check_ls (){
        echo -e "${txtylw2}=======================================${txtrst}"
        echo -e "${txtred2}  << ls ${BACKUP_DIR} >>${txtrst}"
        echo -e ""
        check_ls
        echo -e "${txtylw2}=======================================${txtrst}"
        echo -e ""
}
function print_check_backup (){
        echo -e "${txtylw2}=======================================${txtrst}"
        echo -e "${txtred2}  << ls aws s3 backup >>${txtrst}"  
        check_backup $1
        echo -e "${txtylw2}=======================================${txtrst}"
        echo -e ""
}
function print_check_release (){
        echo -e "${txtylw2}=======================================${txtrst}"
        echo -e "${txtpur2}  << ls aws s3 release >>${txtrst}"  
        check_release
        echo -e "${txtylw2}=======================================${txtrst}"
        echo -e ""
}


### BBD Script ver 1.0 (2017.12.19) 
echo -e "${txtylw2}=======================================${txtrst}"
echo -e "${txtred2}  << Deploy FrontEnd >>${txtrst}"
echo -e "${txtgrn2} 0) Check Develop && AWS S3"
echo -e "${txtgrn2} 1) Develop to AWS S3 (Upload)"
echo -e "${txtgrn2} 2) AWS S3 with CloudFront (Deploy)"
echo -e "${txtgrn2} 3) CloudFront Invalidation"
echo -e "${txtylw2}=======================================${txtrst}"

echo -n "Enter : "
read answer

if [ $answer = '0' ]; then
        echo -e "${txtrst}BACKUP_DIR : ${BACKUP_DIR}${txtrst}"
        print_check_ls
        print_check_backup
elif [ $answer = '1' ]; then
        echo -e "EC2 - Last BACKUP : ${LAST_EC2_BACKUP}"
        echo -e "AWS - Last BACKUP : ${LAST_AWS_BACKUP}"
        echo -n "[Upload - Develop to AWS S3] Sure ? [ Y / n ] "
        read answer
        if [ $answer = 'Y' ];then
                print_check_ls
                print_check_backup
                print_check_release
                aws s3 sync $BACKUP_DIR/$LAST_EC2_BACKUP ${AWS_BACKUP_DIR}/${LAST_EC2_BACKUP}
                if [ $? -eq 0 ];then 
                        post_to_slack "S3 Sync" "S3" "[Develop to AWS S3]"
                else
                        post_to_slack "ERROR" "ERROR" "S3 Upload Fail" "CHECK Upload Process (Develop to AWS S3)"
                fi
        else
                echo "S3 Upload fail"
        fi
elif [ $answer = '2' ]; then
        print_check_backup $LAST_AWS_BACKUP
        print_check_release
        echo -n "[Deploy RELEASE] Sure ? [ Y / n ] "
        read answer
        if [ $answer = 'Y' ];then
                aws s3 sync ${AWS_BACKUP_DIR}/$LAST_AWS_BACKUP ${AWS_RELEASE}/
                if [ $? -eq 0 ];then
                        LAST_AWS_BACKUP_LOG=`check_backup $LAST_AWS_BACKUP` 
                        RELEASE_LOG=`check_release`
                        post_to_slack "Deploy Release" "S3" "Last Backup File Check \n ${LAST_AWS_BACKUP_LOG} \n \nRELASE File Check \n ${RELEASE_LOG}" 
                else
                        post_to_slack "ERROR" "ERROR" "Deploy Fail" "CHECK Release Process"
                fi
        else
                echo "S3 Release fail"
        fi
elif [ $answer = '3' ]; then
        print_check_release
        echo -n "[CloudFront Invalidation] Sure ? [ Y / n ] "
        read answer
        if [ $answer = 'Y' ];then
                aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_ID}  --paths /static/* /index.html
                post_to_slack "CLOUDFRONT Invalidation" "CLOUDFRONT"
        fi
else
        echo -e "Bye~"
fi