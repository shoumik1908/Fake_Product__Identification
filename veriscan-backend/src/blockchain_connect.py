import json
import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# ==============================
# 🔗 Load Environment Variables
# ==============================

RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

# ==============================
# 🔐 Safe Initialization
# ==============================

w3 = None
contract = None
wallet_address = None

if RPC_URL and PRIVATE_KEY and CONTRACT_ADDRESS:
    try:
        w3 = Web3(Web3.HTTPProvider(RPC_URL))

        if w3.is_connected():
            print("✅ Connected to Blockchain")
        else:
            print("⚠️ Blockchain RPC not reachable")

        ABI_PATH = "artifacts/contracts/VeriScanAI.sol/VeriScanAI.json"

        with open(ABI_PATH) as f:
            contract_json = json.load(f)
            contract_abi = contract_json["abi"]

        contract = w3.eth.contract(
            address=Web3.to_checksum_address(CONTRACT_ADDRESS),
            abi=contract_abi
        )

        account = w3.eth.account.from_key(PRIVATE_KEY)
        wallet_address = account.address

    except Exception as e:
        print("⚠️ Blockchain setup failed:", str(e))

else:
    print("⚠️ Blockchain environment variables not set. Running in AI-only mode.")

# ==============================
# 🔥 Store AI Result
# ==============================

def store_ai_result(product_id: str, ai_result: bool, confidence: float):
    if not w3 or not contract:
        print("⚠️ Blockchain not configured — skipping transaction")
        return None

    try:
        nonce = w3.eth.get_transaction_count(wallet_address)

        tx = contract.functions.verifyAuthenticity(
            product_id,
            ai_result,
            int(confidence * 100),
            "QmPredictedImageHash"
        ).build_transaction({
            "from": wallet_address,
            "nonce": nonce,
            "gas": 3000000,
            "gasPrice": w3.to_wei("20", "gwei"),
            "chainId": 80001  # Polygon Mumbai
        })

        signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

        print("⛓ Transaction sent:", tx_hash.hex())

        w3.eth.wait_for_transaction_receipt(tx_hash)

        print("✅ Stored on blockchain successfully!")

        return tx_hash.hex()

    except Exception as e:
        print("❌ Blockchain error:", str(e))
        return None
