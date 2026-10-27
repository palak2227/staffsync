import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dashboardPath = user?.role === 'hr' ? '/hr' : user?.role === 'manager' ? '/manager' : '/employee';

  return (
    <div className="py-5 page-container">
      <Container>
        {/* Hero Section */}
        <div
          className="text-center py-5 bg-white rounded-4 p-4 p-md-5 mb-5 border shadow-sm position-relative overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% -10%, rgba(99, 102, 241, 0.12) 0%, rgba(255, 255, 255, 0) 70%)'
          }}
        >
          <span
            className="badge fw-semibold px-3 py-2 rounded-pill mb-3"
            style={{ backgroundColor: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe', fontSize: '0.8rem' }}
          >
            ✨ Enterprise HR Operating System
          </span>
          <h1 className="display-5 fw-bolder text-dark mb-3" style={{ letterSpacing: '-0.035em' }}>
            Workforce Intelligence with <span className="text-gradient">StaffSync</span>
          </h1>
          <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '640px', fontSize: '1.05rem', lineHeight: '1.7' }}>
            A unified human resource management platform designed for organizational transparency, frictionless attendance tracking, leave governance, and continuous team growth.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {isAuthenticated ? (
              <Button as={Link} to={dashboardPath} variant="primary" size="lg" className="px-4 py-2 fw-semibold">
                Go to Workspace →
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="primary" size="lg" className="px-4 py-2 fw-semibold">
                  ⚡ Sign In / Try Demo
                </Button>
                <Button as={Link} to="/register" variant="outline-primary" size="lg" className="px-4 py-2 fw-semibold">
                  Employee Registration
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Role Highlights */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="h-100 border shadow-sm rounded-4 p-3 card-hover">
              <Card.Body>
                <div
                  className="rounded-3 d-inline-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                    color: '#4f46e5',
                    fontSize: '1.2rem',
                    borderRadius: '12px'
                  }}
                >
                  💻
                </div>
                <Card.Title className="fw-bold mb-2 text-dark fs-5">Employee Portal</Card.Title>
                <Card.Text className="text-secondary small" style={{ lineHeight: '1.6' }}>
                  Daily time recording, automated leave balances, company-wide announcements, and voluntary workshop enrollment.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border shadow-sm rounded-4 p-3 card-hover">
              <Card.Body>
                <div
                  className="rounded-3 d-inline-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    color: '#15803d',
                    fontSize: '1.2rem',
                    borderRadius: '12px'
                  }}
                >
                  💼
                </div>
                <Card.Title className="fw-bold mb-2 text-dark fs-5">Manager Portal</Card.Title>
                <Card.Text className="text-secondary small" style={{ lineHeight: '1.6' }}>
                  Supervise team turnout, adjudicate leave applications, assign technical training courses, and track attendance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border shadow-sm rounded-4 p-3 card-hover">
              <Card.Body>
                <div
                  className="rounded-3 d-inline-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)',
                    color: '#9333ea',
                    fontSize: '1.2rem',
                    borderRadius: '12px'
                  }}
                >
                  👑
                </div>
                <Card.Title className="fw-bold mb-2 text-dark fs-5">HR Administration</Card.Title>
                <Card.Text className="text-secondary small" style={{ lineHeight: '1.6' }}>
                  Staff directory governance, organization-wide leave audits, broadcast circulars, and departmental analytics.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
