#!/bin/bash

# Heartbeat Script für AI Trust Layer
# Dieses Skript wird vom Cron alle 2 Stunden ausgeführt

PROJECT_DIR="/data/.openclaw/workspace/projects/ai-trust-layer"
LOG_FILE="$PROJECT_DIR/logs/heartbeat.log"

cd $PROJECT_DIR

# Log mit Zeitstempel
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Heartbeat started" >> $LOG_FILE

# Git Status prüfen
git status --short >> $LOG_FILE 2>&1

# Prüfe auf uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Uncommitted changes found" >> $LOG_FILE
    
    # Commit und Push auf autonom Branch
    git add .
    git commit -m "autonom: heartbeat checkpoint $(date '+%Y-%m-%d %H:%M')"
    
    # Push zu autonom (falls remote existiert)
    git push origin autonom 2>/dev/null || echo "No remote configured yet" >> $LOG_FILE
fi

# Prüfe auf offene TODOs/Tickets in Code
TODO_COUNT=$(grep -r "TODO\|FIXME\|XXX" --include="*.ts" --include="*.tsx" --include="*.js" apps/ packages/ 2>/dev/null | wc -l)
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Open TODOs: $TODO_COUNT" >> $LOG_FILE

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Heartbeat completed" >> $LOG_FILE