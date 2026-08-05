import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <h1>👤 Profile</h1>

      <div className="profile-card">
        <h3>Name</h3>
        <p>Yash Rahangdale</p>

        <h3>Email</h3>
        <p>example@gmail.com</p>

        <button>Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;