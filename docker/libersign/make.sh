#!/bin/bash

LIBERSIGN_PATH=/var/www/parapheur/libersign
CHANNEL=$1

if [ "${CHANNEL}" == "PROD" ]; then
    SERVER_PATH="https://libersign.libriciel.fr"
else
    SERVER_PATH="https://libersign-test.libriciel.fr"
fi

# Go to libersign folder
pushd ${LIBERSIGN_PATH} > /dev/null  || exit

# Download the tgz and md5, but first... let me delete them !
rm libersign2_${CHANNEL}.tgz /tmp/libersign2_${CHANNEL}.md5sum >/dev/null 2>&1
# Now, get them !
/usr/bin/wget --no-cache "$SERVER_PATH/libersign2_$CHANNEL.tgz"
/usr/bin/wget -q "$SERVER_PATH/libersign2_$CHANNEL.md5sum" -P /tmp

# Verify the all things...
if [ ! -e libersign2_${CHANNEL}.tgz ]
then
        echo "Le fichier libersign2_$CHANNEL.tgz n'existe pas"
        exit;
fi

if [ ! -e /tmp/libersign2_${CHANNEL}.md5sum ]
then
        echo "Le fichier libersign2_$CHANNEL.md5sum n'existe pas"
        exit;
fi
MD5=`md5sum libersign2_${CHANNEL}.tgz | awk '{print $1}'`
echo ${MD5}

if [ -z ${MD5} ]
then
        echo "PROBLEME MD5SUM null"
        exit;
fi
if [ ${MD5} != `cat /tmp/libersign2_${CHANNEL}.md5sum` ]
then
        echo "PROBLEME MD5SUM DIFFERENT DE CELUI TELECHARGE";
        exit;
fi
# Boring verifications done


# Reset the update.json
echo '{}' > update.json

# Reset the update folder
rm -rf update && mkdir update

# Uncompress the tgz to update folder
tar zxf libersign2_${CHANNEL}.tgz -C update

# Now, deal with the json generation
cd update

handlefile() {
    if [ -s "$1" ]
    then
        echo "$1"
        md5=$(md5sum "$1" | cut -d' ' -f1)
        json="$json \"$1\":\"$md5\""

        base64 "$1" > "$1.b64"
    fi
}

json="{"

for file in $(find -name '*.jar' | sed -e "s/\.\///g"); do
    handlefile "$file"
done

json="$json }"
json=$(sed -e 's/" "/", "/g' <<< "$json")

echo "$json" > ../update.json
# The json file is generated, it's all done now !

# Return to the base directory
popd > /dev/null
