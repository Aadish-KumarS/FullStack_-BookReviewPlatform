import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/pages/profile.css';

const ProfilePage = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container unauthenticated">
          <div className="auth-card">
            <div className="auth-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2>Access Your Profile</h2>
            <p>Please log in to view your personalized profile and manage your book reviews.</p>
            <div className="auth-buttons">
              <button onClick={() => navigate('/login')} className="btn btn-primary">
                <span>Login</span>
              </button>
              <button onClick={() => navigate('/register')} className="btn btn-secondary">
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-page">
      <div className="profile-container authenticated">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{getInitials(user.name)}</span>
          </div>
          <div className="profile-welcome">
            <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
            <p>Manage your reading journey and book reviews</p>
          </div>
          <button onClick={handleLogout} className="btn btn-logout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon books">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>12</h3>
              <p>Books Reviewed</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon reviews">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>4.2</h3>
              <p>Avg Rating</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon reading">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>3</h3>
              <p>Currently Reading</p>
            </div>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="profile-info-card">
          <h2>Profile Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
            <div className="info-item">
              <label>Member Since</label>
              <p>January 2024</p>
            </div>
            <div className="info-item">
              <label>Reading Goal</label>
              <p>24 books this year</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <div className="section-header">
            <h2>Your Book Reviews</h2>
            <button onClick={() => navigate('/books')} className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Add Review</span>
            </button>
          </div>
          
          <div className="reviews-placeholder">
            <div className="placeholder-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h3>Start Your Reading Journey</h3>
            <p>You haven't written any reviews yet. Share your thoughts on books you've read!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;