import hashlib

sha256_hash = hashlib.sha256()

data_to_hash = input("Enter data to hash: ")
sha256_hash.update(data_to_hash.encode('utf-8'))

hex_digest = sha256_hash.hexdigest()
print(f"SHA-256 Hex Digest: {hex_digest}")