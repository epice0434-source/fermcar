#!/usr/bin/env bash

################################################################################
##
##  Gradle startup script for UN*X
##
################################################################################

# Attempt to set APP_HOME
# Resolve links: $0 may be a link
PRG="$0"
# Need this for relative symlinks.
while [ -h "$PRG" ] ; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
        PRG="$link"
    else
        PRG=`dirname "$PRG"`"/$link"
    fi
done
SAVED="`pwd`"
cd "`dirname \"$PRG\"`/" >/dev/null
APP_HOME="`pwd -P`"
cd "$SAVED" >/dev/null

APP_NAME="Gradle"
APP_BASE_NAME=`basename "$0"`

# Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
DEFAULT_JVM_OPTS=""

# Use the maximum available, or at least 512M, for a terminal.
if [ -n "$JAVA_OPTS" ] ; then
    JAVA_OPTS="$JAVA_OPTS -Xmx512m"
else
    JAVA_OPTS="-Xmx512m"
fi

warn () {
    echo "$*"
}

die () {
    echo
    echo "$*"
    echo
    exit 1
}

# OS specific support (must be 'true' or 'false').
cygwin=false
msys=false
darwin=false
nonstop=false
case "`uname`" in
  CYGWIN* )
    cygwin=true
    ;;
  Darwin* )
    darwin=true
    ;;
  MSYS* | MINGW* )
    msys=true
    ;;
  NONSTOP* )
    nonstop=true
    ;;
esac

CLASSPATH=$APP_HOME/gradle/wrapper/gradle-wrapper.jar

# Determine the Java command to use to start the JVM.
if [ -n "$JAVA_HOME" ] ; then
    if [ -x "$JAVA_HOME/jre/sh/java" ] ; then
        # IBM's JDK on AIX uses strange locations for the executables
        JAVACMD="$JAVA_HOME/jre/sh/java"
    else
        JAVACMD="$JAVA_HOME/bin/java"
    fi
    if [ ! -x "$JAVACMD" ] ; then
        die "ERROR: JAVA_HOME is set to an invalid directory: $JAVA_HOME

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
    fi
else
    JAVACMD="java"
    which java >/dev/null 2>&1 || die "ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
fi

# For Cygwin, switch paths to Windows format before running java
if $cygwin ; then
    APP_HOME=`cygpath --path --mixed "$APP_HOME"`
    CLASSPATH=`cygpath --path --mixed "$CLASSPATH"`
    JAVACMD=`cygpath --unix "$JAVACMD"`

    # We build the pattern for arguments to be converted via cygpath
    ROOTDIRSRAW=`find / -maxdepth 1 -adjt | tr '\n' '|'`
    SEP=""
    for dir in /dev /bin /lib /usr /etc /var /sbin /tmp ; do
      if [ -d "$dir" ] ; then
        ROOTDIRSRAW="${ROOTDIRSRAW}${SEP}${dir}"
        SEP="|"
      fi
    done
    OURCYGPATTERN="(^($ROOTDIRSRAW))"
    # Add a user-defined pattern to the cygpath arguments
    if [ "$GRADLE_CYGPATTERN" != "" ] ; then
        OURCYGPATTERN="$OURCYGPATTERN|($GRADLE_CYGPATTERN)"
    fi
    # Now convert the arguments - kludge to limit ourselves to /bin/sh
    i=0
    for arg in "$@" ; do
        CHECK=`echo "$arg"|egrep -c "$OURCYGPATTERN" -`
        CHECK2=`echo "$arg"|egrep -c "^-" -`
        if [ $CHECK -ne 0 ] && [ $CHECK2 -eq 0 ] ; then
            eval `echo "arguments$i"`=`cygpath --path --ignore --mixed "$arg"`
        else
            eval `echo "arguments$i"`="\"$arg\""
        fi
        i=$((i+1))
    done
    case $i in
        (0) set -- ;;
        (1) set -- "$arguments0" ;;
        (2) set -- "$arguments0" "$arguments1" ;;
        (3) set -- "$arguments0" "$arguments1" "$arguments2" ;;
        (4) set -- "$arguments0" "$arguments1" "$arguments2" "$arguments3" ;;
        (5) set -- "$arguments0" "$arguments1" "$arguments2" "$arguments3" "$arguments4" ;;
        (6) set -- "$arguments0" "$arguments1" "$arguments2" "$arguments3" "$arguments4" "$arguments5" ;;
        (7) set -- "$arguments0" "$arguments1" "$arguments2" "$arguments3" "$arguments4" "$arguments5" "$arguments6" ;;
        (8) set -- "$arguments0" "$arguments1" "$arguments2" "$arguments3" "$arguments4" "$arguments5" "$arguments6" "$arguments7" ;;
        (9) set -- "$arguments0" "$arguments1" "$arguments2" "$arguments3" "$arguments4" "$arguments5" "$arguments6" "$arguments7" "$arguments8" ;;
    esac
fi

# Escape application args
save () {
    for i do printf %s\\n "$i" | sed "s/'/'\\\\''/g;1s/^/'/;\$s/\$/'/"; done
}
APP_ARGS=$(save "$@")

# Collect all arguments for the java command.
eval set -- "$DEFAULT_JVM_OPTS" "$JAVA_OPTS" "$GRADLE_OPTS" "\"-Dorg.gradle.appname=$APP_BASE_NAME\"" -classpath "\"$CLASSPATH\"" org.gradle.wrapper.GradleWrapperMain "$APP_ARGS"

exec "$JAVACMD" "$@"
