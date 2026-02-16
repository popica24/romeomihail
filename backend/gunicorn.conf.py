# noqa: N999
"""
Gunicorn configuration module.

This module sets up the logging configuration for the Gunicorn server.
"""

import os

base_dir = os.path.dirname(os.path.abspath(__file__))
logs_dir = os.path.join(base_dir, "logs")


if not os.path.exists(logs_dir):
    try:
        os.makedirs(logs_dir)
        print(f"Created logs directory: {logs_dir}")
    except OSError as e:
        print(f"Error creating logs directory: {e}")
        raise

accesslog = os.path.join(base_dir, "logs", "gunicorn.access.log")
errorlog = os.path.join(base_dir, "logs", "gunicorn.error.log")

# Whether to send Django output to the error log
CAPTURE_OUTPUT = True
# How verbose the Gunicorn error logs should be
LOGLEVEL = "info"

