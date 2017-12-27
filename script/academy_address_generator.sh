#!/bin/bash

## Kakao local api 


KAKAO_URL=https://dapi.kakao.com/v2/local/search/address.json
APP_KEY="Put in Your Kakao APP KEY"
CSV_FILE="Put in Your Address CSV File Path"
OUTCOME_FILE=outfile.csv
## CSV File Format
##학원명,학원주소

## First of all, You should : `apt install jq`

touch ${OUTCOME_FILE}
while read line
do
        NAME=`echo $line | awk -F[","] {'print $1'} |sed -e "s/\"//g"`
        QUERY_ADDRESS=`echo $line | awk -F[","] {'print $2'} |sed -e "s/\"//g"`
	curl -v -X GET "${KAKAO_URL}" --data-urlencode "query=${QUERY_ADDRESS}" -H "Authorization: KakaoAK ${APP_KEY}" | jq '.'> test
	
	echo "${NAME},`cat test | jq '.documents[0] |{road_address: .road_address.address_name,building_name: .road_address.building_name, address_name: .address.address_name, region_1depth_name: .address.region_1depth_name, region_2depth_name: .address.region_2depth_name, region_3depth_h_name: .address.region_3depth_h_name, zip_code: .address.zip_code, x: .x, y: .y }'  | grep "road_address\|building_name\|address_name\|region_1depth_name\|region_2depth_name\|region_3depth_h_name\|zip_code\|\"x\"\|\"y\"" |sed -e "s/  //g"| awk -F[":"] {'print $2'}|tr "\n" "|"| sed -e "s/|//g" | sed -e "s/,$//g" |sed -e "s/\\"//g" `" >> ${OUTCOME_FILE}
done < $CSV_FILE

rm -rf test

##OUT File Format
##학원명, 학원도로명주소, 학원주소, 시, 구, 동, 지역코드, X좌표, Y좌표
