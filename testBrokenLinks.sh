# Builds the current Docusaurus instance and looks for broken links based on Docusaurus logs - and double checks with the actual webpage running at $BASEURL.
#   Docusuarus does not see other instances behind Nginx - relative links to other pages look like they are broken.
#
# POC-ish, but works for now.

BASEURL="https://docs-v2.apify.com";
npx docusaurus build 2> >(tee errors.log >&2);
#                        take the first non-spacy string      all the links are on lines with "linking to"            remove ANSI escape sequences
#                       vvv                          vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv          vvvv
LINKS=$(awk -e '$1 ~ /^([^\s]+)/ {print $2}' <(grep "linking to" ./errors.log | sed "s/-> linking to//") | sed 's/\x1B\[[0-9;]\{1,\}[A-Za-z]//g')

for l in $LINKS; 
do 
    STATUS=$(curl -o /dev/null --silent --head --write-out '%{http_code}\n' $BASEURL/$l);
    if [[ $STATUS -ne 200 ]]; then
        echo "Broken link: $BASEURL/$l ($STATUS)";
    fi;
done;