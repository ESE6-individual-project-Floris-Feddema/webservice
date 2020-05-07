#!/usr/bin sh
gpg --quiet --batch --yes --passphrase="$GPG_PASSPHRASE" --output config.json --decrypt config.json.gpg