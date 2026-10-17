from app.core.security import create_access_token, decode_access_token, hash_password, verify_password


def test_password_hash_and_verify_roundtrip():
    hashed = hash_password("correct-horse-battery-staple")
    assert verify_password("correct-horse-battery-staple", hashed)
    assert not verify_password("wrong-password", hashed)


def test_password_hash_is_not_plaintext():
    hashed = hash_password("mypassword")
    assert hashed != "mypassword"


def test_access_token_roundtrip():
    token = create_access_token(subject="user-123")
    subject = decode_access_token(token)
    assert subject == "user-123"


def test_invalid_token_returns_none():
    assert decode_access_token("not-a-real-token") is None
