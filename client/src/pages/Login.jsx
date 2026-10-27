import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice.js';
import api from '../api/axios.js';

const DEMO_ACCOUNTS = [
  {
    role: 'hr',
    badge: 'HR Admin',
    badgeColor: '#ecfdf5',
    badgeText: '#059669',
    badgeBorder: '#a7f3d0',
    name: 'Priya Sharma',
    title: 'Director of People & Culture',
    email: 'hr@modernhr.com',
    password: 'Password@123',
    icon: '👑'
  },
  {
    role: 'manager',
    badge: 'Manager',
    badgeColor: '#f0fdf4',
    badgeText: '#16a34a',
    badgeBorder: '#bbf7d0',
    name: 'Vikram Malhotra',
    title: 'VP of Engineering',
    email: 'manager1@modernhr.com',
    password: 'Password@123',
    icon: '💼'
  },
  {
    role: 'employee',
    badge: 'Employee',
    badgeColor: '#eef2ff',
    badgeText: '#6366f1',
    badgeBorder: '#c7d2fe',
    name: 'Rohan Gupta',
    title: 'Sr. Frontend Engineer',
    email: 'emp1@modernhr.com',
    password: 'Password@123',
    icon: '💻'
  }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (loginEmail, loginPassword) => {
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email: loginEmail, password: loginPassword });
      const { user, token } = res.data;
      dispatch(setCredentials({ user, token }));

      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (user.role === 'hr') navigate('/hr');
        else if (user.role === 'manager') navigate('/manager');
        else navigate('/employee');
      }
    } catch (err) {
      if (!err.response) {
        setError(
          'Unable to reach backend server. If using free hosting like Render, it may be waking up (please retry in 20-30 seconds).'
        );
      } else {
        setError(err.response?.data?.message || 'Invalid email address or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleSelectDemo = (acc, autoSubmit = false) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setActiveDemo(acc.role);
    if (autoSubmit) {
      handleLogin(acc.email, acc.password);
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
              <p className="text-muted small mb-0">Enter your credentials or choose a quick demo account</p>
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

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="small fw-semibold text-secondary">Work Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="e.g. hr@modernhr.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
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
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
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
                        Authenticating...
                      </>
                    ) : (
                      'Sign In to Workspace →'
                    )}
                  </Button>
                </Form>

                {/* Quick 1-Click Demo Profiles */}
                <div className="pt-3 border-top mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold text-dark" style={{ fontSize: '0.8rem', letterSpacing: '0.02em' }}>
                      ⚡ Instant Demo Showcase
                    </span>
                    <span className="badge bg-light text-secondary border small" style={{ fontSize: '0.7rem' }}>
                      Click to Test
                    </span>
                  </div>

                  <div className="d-flex flex-column gap-2 mb-3">
                    {DEMO_ACCOUNTS.map((acc) => (
                      <div
                        key={acc.role}
                        className={`demo-role-card d-flex align-items-center justify-content-between ${
                          activeDemo === acc.role ? 'active' : ''
                        }`}
                        onClick={() => handleSelectDemo(acc, false)}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: '1.2rem' }}>{acc.icon}</span>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-bold small text-dark">{acc.name}</span>
                              <span
                                className="badge px-2 py-0"
                                style={{
                                  backgroundColor: acc.badgeColor,
                                  color: acc.badgeText,
                                  border: `1px solid ${acc.badgeBorder}`,
                                  fontSize: '0.68rem',
                                  borderRadius: '6px'
                                }}
                              >
                                {acc.badge}
                              </span>
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                              {acc.email} • <span className="text-dark-50">{acc.title}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant={activeDemo === acc.role ? 'primary' : 'outline-primary'}
                          className="py-1 px-2"
                          style={{ fontSize: '0.72rem', borderRadius: '8px' }}
                          disabled={loading}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectDemo(acc, true);
                          }}
                        >
                          Login
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div
                    className="p-2 rounded-3 text-center"
                    style={{ backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', fontSize: '0.72rem', color: '#64748b' }}
                  >
                    Demo password for all accounts is: <strong className="text-dark">Password@123</strong>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="text-center small text-muted pt-3 border-top mt-3">
                  Need a staff account?{' '}
                  <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: '#6366f1' }}>
                    Create Account
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

export default Login;
