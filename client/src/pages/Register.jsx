import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice.js';
import api from '../api/axios.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { user, token } = res.data;
      dispatch(setCredentials({ user, token }));
      navigate('/employee');
    } catch (err) {
      if (!err.response) {
        setError(
          'Unable to reach backend server. If using free hosting like Render, it may be waking up (please retry in 20-30 seconds).'
        );
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 page-container d-flex align-items-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            {/* Header Brand */}
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center text-white fw-bold shadow-sm mb-3"
                style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                  borderRadius: '14px',
                  fontSize: '1.4rem',
                  letterSpacing: '-0.02em',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
                }}
              >
                ⚡
              </div>
              <h3 className="fw-bolder text-dark mb-1" style={{ letterSpacing: '-0.03em' }}>
                Staff<span className="text-gradient">Sync</span>
              </h3>
              <p className="text-muted small mb-0">Create your new employee account</p>
            </div>

            {/* Main Auth Card */}
            <Card className="border-0 shadow-lg rounded-4 p-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
              <Card.Body className="p-0">
                {error && (
                  <Alert variant="danger" className="py-2 px-3 small rounded-3 mb-3 border-danger-subtle d-flex align-items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="regName">
                    <Form.Label className="small fw-semibold text-secondary">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="regEmail">
                    <Form.Label className="small fw-semibold text-secondary">Corporate Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="regPass">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Form.Label className="small fw-semibold text-secondary mb-0">Password</Form.Label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-link p-0 text-decoration-none small text-muted"
                        style={{ fontSize: '0.78rem' }}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="regPassConfirm">
                    <Form.Label className="small fw-semibold text-secondary">Confirm Password</Form.Label>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 fw-semibold mb-3"
                    disabled={loading}
                    style={{ fontSize: '0.95rem' }}
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Employee Account →'
                    )}
                  </Button>
                </Form>

                {/* Footer Switch to Login */}
                <div className="text-center small text-muted pt-3 border-top mt-2">
                  Already have an account?{' '}
                  <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: '#6366f1' }}>
                    Sign In
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
