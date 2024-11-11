import logging

logger = logging.getLogger("app")
logger.setLevel(logging.INFO)
logger.propagate = False  # prevent double logging

if not logger.handlers:
    ch = logging.StreamHandler()
    ch.setFormatter(logging.Formatter("%(levelname)s : %(name)s : %(message)s"))
    logger.addHandler(ch)
