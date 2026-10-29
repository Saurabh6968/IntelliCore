import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Profile() {
  const navigate = useNavigate()

  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [careerArea, setCareerArea] = useState('')
  const [degree, setDegree] = useState('')
  const [institution, setInstitution] = useState('')
  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const [graduationYear, setGraduationYear] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [profileSuccess, setProfileSuccess] = useState('')
  const [editError, setEditError] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  // Copy a user object from the backend into the form state
  function applyUser(user) {
    const education = user.education?.[0] || {}

    setName(user.name || '')
    setEmail(user.email || '')
    setMobile(user.phone || '')
    setJobRole(user.targetRole || '')
    setCareerArea(user.careerArea || '')
    setDegree(education.degree || '')
    setInstitution(education.institution || '')
    setFieldOfStudy(education.fieldOfStudy || '')
    setGraduationYear(education.graduationYear || '')
  }

  function handleAuthFailure(error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      localStorage.removeItem('token')
      navigate('/login')
      return true
    }

    return false
  }

  // Fetch the currently logged-in user's profile
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    let cancelled = false

    axios
      .get(`${API_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (cancelled) return
        applyUser(response.data.user)
      })
      .catch((error) => {
        if (cancelled) return
        if (handleAuthFailure(error)) return

        setProfileError(
          error.response?.data?.message ||
            'Could not load your profile. Please try again.'
        )
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  async function handleSaveProfile() {
    if (saving) return

    setEditError('')
    setProfileSuccess('')

    if (!name.trim()) {
      setEditError('Full name is required.')
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    setSaving(true)

    try {
      const response = await axios.put(
        `${API_URL}/api/users/profile`,
        {
          name: name.trim(),
          phone: mobile.trim(),
          targetRole: jobRole.trim(),
          careerArea: careerArea.trim(),
          education: [
            {
              degree: degree.trim(),
              institution: institution.trim(),
              fieldOfStudy: fieldOfStudy.trim(),
              graduationYear: graduationYear
                ? Number(graduationYear)
                : undefined,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      applyUser(response.data.user)
      setShowEditProfile(false)
      setProfileSuccess('Profile updated successfully!')
    } catch (error) {
      console.error(
        'Profile update failed:',
        error.response?.data || error.message
      )

      if (handleAuthFailure(error)) return

      setEditError(
        error.response?.data?.message || 'Could not update profile.'
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword() {
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

    try {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      const response = await axios.put(
        `${API_URL}/api/users/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setPasswordSuccess(
        response.data.message || 'Password changed successfully.'
      )

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error(
        'Password change failed:',
        error.response?.data || error.message
      )

      setPasswordError(
        error.response?.data?.message ||
          'Could not change password. Please try again.'
      )
    }
  }

  if (loading) {
    return <div className="profile-page">Loading your profile...</div>
  }

  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <div>
          <span className="profile-eyebrow">ACCOUNT</span>
          <h1>My Profile</h1>
          <p>Manage your personal, academic and career information.</p>
        </div>

        <button
          className="profile-back-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      {profileError && (
        <div className="password-message password-error">
          {profileError}
        </div>
      )}

      {profileSuccess && (
        <div className="password-message password-success">
          ✓ {profileSuccess}
        </div>
      )}

      <div className="profile-overview">
        <div className="profile-avatar-large">
          {name ? name.charAt(0).toUpperCase() : '?'}
        </div>

        <div className="profile-overview-info">
          <h2>{name || 'Name not available'}</h2>
          <p>Student</p>
          <span>IntelliCore Member</span>
        </div>

        <button
          className="profile-edit-button"
          onClick={() => {
            setEditError('')
            setProfileSuccess('')
            setShowEditProfile(true)
          }}
        >
          Edit Profile
        </button>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-card-heading">
            <div className="profile-card-icon">👤</div>
            <div>
              <h3>Personal Information</h3>
              <p>Your basic account details</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-detail">
              <span>Full Name</span>
              <strong>{name || 'Not provided'}</strong>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <strong>{email || 'Not provided'}</strong>
            </div>

            <div className="profile-detail">
              <span>Mobile Number</span>
              <strong>{mobile || 'Not provided'}</strong>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-heading">
            <div className="profile-card-icon">🎓</div>
            <div>
              <h3>Academic Information</h3>
              <p>Your education details</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-detail">
              <span>College / University</span>
              <strong>{institution || 'Not provided'}</strong>
            </div>

            <div className="profile-detail">
              <span>Degree</span>
              <strong>{degree || 'Not provided'}</strong>
            </div>

            <div className="profile-detail">
              <span>Specialization</span>
              <strong>{fieldOfStudy || 'Not provided'}</strong>
            </div>

            <div className="profile-detail">
              <span>Graduation Year</span>
              <strong>{graduationYear || 'Not provided'}</strong>
            </div>
          </div>
        </div>

        <div className="profile-card profile-card-wide">
          <div className="profile-card-heading">
            <div className="profile-card-icon">🎯</div>
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
              <strong>{jobRole || 'Not provided'}</strong>
            </div>

            <div className="career-profile-item">
              <span>Career Area</span>
              <strong>{careerArea || 'Not provided'}</strong>
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

        <div className="profile-card profile-card-wide">
          <div className="profile-card-heading">
            <div className="profile-card-icon">⚙</div>
            <div>
              <h3>Account Settings</h3>
              <p>Manage your IntelliCore account</p>
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
              onClick={handleLogout}
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
                <input type="email" value={email} readOnly disabled />
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

              <div className="profile-form-group">
                <label>College / University</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>

              <div className="profile-form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </div>

              <div className="profile-form-group">
                <label>Specialization</label>
                <input
                  type="text"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                />
              </div>

              <div className="profile-form-group">
                <label>Graduation Year</label>
                <input
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
              </div>
            </div>

            {editError && (
              <div className="password-message password-error">
                {editError}
              </div>
            )}

            <div className="profile-modal-actions">
              <button
                className="profile-cancel-button"
                onClick={() => setShowEditProfile(false)}
              >
                Cancel
              </button>

              <button
                className="profile-save-button"
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
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
