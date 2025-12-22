import os
from dotenv import load_dotenv

load_dotenv()

ENV = os.getenv("ENV", "mock")
TEST_MODE = os.getenv("TEST_MODE", "false").lower() == "true"
WHATSAPP_GROUP_ID = os.getenv("WHATSAPP_GROUP_ID")
