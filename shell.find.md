### reference: https://adamtheautomator.com/bash-find/
## find a stale file

**STOP USING YOUR FILE EXPLORER TO FIND A FILE** :-1:

Find all files modified more than 5 days ago

```shell
$ find my_folder -mtime +5
```

you can see the list of files and directories found recursively inside the snap directory.
find "name"

# Find files and directories with names starting with 'snap'
find -name "snap*"

# Find files and directories with names starting with 'snap'
# in case insensitive manner (For example:'Snap', 'snap', 'SNaP', etc.)
find -iname "snap*"

# Find a file named 'snap'
find "snap" -type f
# Find a directory named 'snap'
find "snap" -type d

find -name "snap*" -type d

# Find files only (-type f) and (-and) ensure the names (-name) start with snap
# in the current directory and subdirectories.
find -name "snap*" -and -type f

# Find directories only (-type d) and (-and) ensure the names (-name) start with snap
# in the current directory and subdirectories.
find -name "snap*" -and -type d

# Find files only (-type f) and (-and) ensure the names (-name) start with snap
find -name "snap" -and -type f

# Find directories only (-type d) and (-and) ensure the names (-name) start with snap
find -name "snap" -and -type d

find -name "snap*" -type f -or -name "chart*"

find -not -name "snap*" -type f

find "snap" -depth

# Find files and directories one step down from the working directory
find . -maxdepth 1 -name "chart*"

# Find files and directories two steps down from the ~/chart directory
find ~/chart -maxdepth 2 -name "chart"

# Find files and directories you last accessed between 2-3 days ago
find -atime 2

# Find files and directories you last accessed within the past 2 days
find -atime -2

# Find files and directories you last accessed within the past day
find -atime 0

# Find a file named 'snap.doc' then open the file in vi editor
find -name "snap.doc" -exec vi {} \;

# Find a file named 'snap.doc' then remove the file
find -name "snap.doc" -exec rm {} \;

# Find a directory named 'thanos', then delete the directory
# This command fails since the 'thanos' directory is not empty
find "thanos" -type d -delete

# Find a file named 'thanos.snap', then delete the file
find "thanos.snap" -type f -delete