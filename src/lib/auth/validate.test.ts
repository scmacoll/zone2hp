import { describe, expect, it } from 'vitest';
import { validateCredentials, validateSignUp } from './validate';

describe('validateSignUp', () => {
  const valid = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'a-good-passphrase',
    marketingOptIn: false,
  };

  it('accepts a complete, well-formed signup', () => {
    expect(validateSignUp(valid)).toEqual({});
  });

  it('requires a name', () => {
    expect(validateSignUp({ ...valid, name: '   ' })).toEqual({
      name: 'Please enter your name.',
    });
  });

  it('rejects an email without an @', () => {
    expect(validateSignUp({ ...valid, email: 'jane.example.com' }).email).toBe(
      'Please enter a valid email address.',
    );
  });

  it('rejects an email without a domain dot', () => {
    expect(validateSignUp({ ...valid, email: 'jane@example' }).email).toBeDefined();
  });

  it('rejects an email with whitespace inside', () => {
    expect(validateSignUp({ ...valid, email: 'ja ne@example.com' }).email).toBeDefined();
  });

  it('accepts an email with surrounding whitespace, which is trimmed', () => {
    expect(validateSignUp({ ...valid, email: '  jane@example.com  ' }).email).toBeUndefined();
  });

  it('requires at least 8 characters of password', () => {
    expect(validateSignUp({ ...valid, password: 'short12' }).password).toBe(
      'Use at least 8 characters.',
    );
  });

  it('accepts a password of exactly 8 characters', () => {
    expect(validateSignUp({ ...valid, password: '12345678' }).password).toBeUndefined();
  });

  it('does not trim the password, because spaces are legitimate characters', () => {
    expect(validateSignUp({ ...valid, password: '  pass  ' }).password).toBeUndefined();
  });

  it('rejects a password long enough to be a denial-of-service vector', () => {
    expect(validateSignUp({ ...valid, password: 'x'.repeat(200) }).password).toBeDefined();
  });

  it('reports every invalid field at once, rather than stopping at the first', () => {
    const errors = validateSignUp({ name: '', email: 'nope', password: 'x', marketingOptIn: false });
    expect(Object.keys(errors).sort()).toEqual(['email', 'name', 'password']);
  });
});

describe('validateCredentials', () => {
  it('accepts a well-formed email and any non-empty password', () => {
    expect(validateCredentials({ email: 'jane@example.com', password: 'x' })).toEqual({});
  });

  it('requires a password to be present', () => {
    expect(validateCredentials({ email: 'jane@example.com', password: '' }).password).toBe(
      'Please enter your password.',
    );
  });

  it('does not apply the signup length rule when signing in', () => {
    // An existing account may predate a rule change; the server is the authority.
    expect(validateCredentials({ email: 'jane@example.com', password: 'abc' })).toEqual({});
  });

  it('still requires a valid email shape', () => {
    expect(validateCredentials({ email: 'nope', password: 'secret' }).email).toBeDefined();
  });
});
