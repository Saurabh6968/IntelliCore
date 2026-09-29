import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
    const [showEditProfile, setShowEditProfile] = useState(false)

  const [name, setName] = useState('Shivay Singh Goyal')
  const [email, setEmail] = useState('shivay@example.com')
  const [mobile, setMobile] = useState('+91 XXXXX XXXXX')
  const [jobRole, setJobRole] = useState('Software Developer')
  const [careerArea, setCareerArea] = useState('Software & Technology')

    const [showChangePassword, setShowChangePassword] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

    function handleChangePassword() {
    setPasswordError('')
    setPasswordSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.')
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.')
      return
    }

    setPasswordSuccess('Password updated successfully.')

    setTimeout(() => {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setShowChangePassword(false)
      setPasswordSuccess('')
    }, 1200)
  }

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-page-header">
        <div>
          <span className="profile-eyebrow">
            ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal, academic and career information.
          </p>
        </div>

        <button
          className="profile-back-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>


      {/* Profile Overview */}
      <div className="profile-overview">

        <div className="profile-avatar-large">
          S
        </div>

        <div className="profile-overview-info">
          <h2>Shivay Singh Goyal</h2>

          <p>Student</p>

          <span>IntelliCore Member</span>
        </div>

        <button
          className="profile-edit-button"
          onClick={() => setShowEditProfile(true)}
        >
           Edit Profile
        </button>

      </div>


      {/* Information Cards */}
      <div className="profile-grid">

        {/* Personal Information */}
        <div className="profile-card">

          <div className="profile-card-heading">

            <div className="profile-card-icon">
              👤
            </div>

            <div>
              <h3>Personal Information</h3>
              <p>Your basic account details</p>
            </div>

          </div>


          <div className="profile-details">

            <div className="profile-detail">
              <span>Full Name</span>
              <strong>Shivay Singh Goyal</strong>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <strong>shivay@example.com</strong>
            </div>

            <div className="profile-detail">
              <span>Mobile Number</span>
              <strong>+91 XXXXX XXXXX</strong>
            </div>

          </div>

        </div>


        {/* Academic Information */}
        <div className="profile-card">

          <div className="profile-card-heading">

            <div className="profile-card-icon">
              🎓
            </div>

            <div>
              <h3>Academic Information</h3>
              <p>Your education details</p>
            </div>

          </div>


          <div className="profile-details">

            <div className="profile-detail">
              <span>College / University</span>
              <strong>PSIT Kanpur</strong>
            </div>

            <div className="profile-detail">
              <span>Degree</span>
              <strong>B.Tech</strong>
            </div>

            <div className="profile-detail">
              <span>Specialization</span>
              <strong>Computer Science & AI</strong>
            </div>

            <div className="profile-detail">
              <span>Graduation Year</span>
              <strong>2028</strong>
            </div>

          </div>

        </div>


        {/* Career Preferences */}
        <div className="profile-card profile-card-wide">

          <div className="profile-card-heading">

            <div className="profile-card-icon">
              🎯
            </div>

            <div>
              <h3>Career Preferences</h3>

              <p>
                Information used to personalize your placement preparation
              </p>
            </div>

          </div>


          <div className="career-profile-grid">

            <div className="career-profile-item">
              <span>Target Job Role</span>
              <strong>Software Developer</strong>
            </div>

            <div className="career-profile-item">
              <span>Career Area</span>
              <strong>Software & Technology</strong>
            </div>

            <div className="career-profile-item">
              <span>Preparation Status</span>

              <strong className="profile-status">
                <span></span>
                Active
              </strong>
            </div>

          </div>

        </div>


        {/* Account Settings */}
        <div className="profile-card profile-card-wide">

          <div className="profile-card-heading">

            <div className="profile-card-icon">
              ⚙
            </div>

            <div>
              <h3>Account Settings</h3>

              <p>
                Manage your IntelliCore account
              </p>
            </div>

          </div>


          <div className="profile-actions">

            <button
              className="profile-action-button"
              onClick={() => {
               setShowChangePassword(true)
               setPasswordError('')
               setPasswordSuccess('')
             }}
            >
             🔒 Change Password
            </button>

            <button
              className="profile-action-button logout-button"
              onClick={() => navigate('/login')}
            >
              ↪ Logout
            </button>

          </div>

        </div>

      </div>
            {showEditProfile && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">

            <div className="profile-modal-header">
              <div>
                <span className="profile-eyebrow">ACCOUNT</span>
                <h2>Edit Profile</h2>
                <p>Update your personal and career information.</p>
              </div>

              <button
                className="profile-modal-close"
                onClick={() => setShowEditProfile(false)}
              >
                ×
              </button>
            </div>

            <div className="profile-form">

              <div className="profile-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="profile-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="profile-form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="profile-form-group">
                <label>Target Job Role</label>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>

              <div className="profile-form-group">
                <label>Career Area</label>
                <input
                  type="text"
                  value={careerArea}
                  onChange={(e) => setCareerArea(e.target.value)}
                />
              </div>

            </div>

            <div className="profile-modal-actions">

              <button
                className="profile-cancel-button"
                onClick={() => setShowEditProfile(false)}
              >
                Cancel
              </button>

              <button
                className="profile-save-button"
                onClick={() => setShowEditProfile(false)}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}
            {showChangePassword && (
        <div className="profile-modal-overlay">
          <div className="profile-modal password-modal">

            <div className="profile-modal-header">
              <div>
                <span className="profile-eyebrow">SECURITY</span>
                <h2>Change Password</h2>
                <p>Update your IntelliCore account password.</p>
              </div>

              <button
                className="profile-modal-close"
                onClick={() => {
                  setShowChangePassword(false)
                  setPasswordError('')
                  setPasswordSuccess('')
                }}
              >
                ×
              </button>
            </div>

            <div className="password-form">

              <div className="profile-form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value)
                    setPasswordError('')
                  }}
                />
              </div>

              <div className="profile-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    setPasswordError('')
                  }}
                />
              </div>

              <div className="profile-form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setPasswordError('')
                  }}
                />
              </div>

            </div>

            {passwordError && (
              <div className="password-message password-error">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="password-message password-success">
                ✓ {passwordSuccess}
              </div>
            )}

            <div className="profile-modal-actions">

              <button
                className="profile-cancel-button"
                onClick={() => {
                  setShowChangePassword(false)
                  setPasswordError('')
                  setPasswordSuccess('')
                }}
              >
                Cancel
              </button>

              <button
                className="profile-save-button"
                onClick={handleChangePassword}
              >
                Update Password
              </button>

            </div>

          </div>
        </div>
      )}
      

    </div>
  )
}

export default Profile