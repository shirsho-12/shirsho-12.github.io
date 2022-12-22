  FILE=Gemfile.lock
if [ -f "$FILE" ]; then
    rm $FILE
fi
  docker build -t "shirsho-12.github.io:latest" . 