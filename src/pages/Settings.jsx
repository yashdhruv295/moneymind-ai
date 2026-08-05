import "./Settings.css";

function Settings() {
  return (
    <div className="settings-container">
      <h1>⚙️ Settings</h1>

      <div className="settings-card">
        <h3>Profile</h3>
        <p>Manage your profile information.</p>
      </div>

      <div className="settings-card">
        <h3>Notifications</h3>
        <p>Control app notifications.</p>
      </div>

      <div className="settings-card">
        <h3>Theme</h3>
        <p>Switch between light and dark mode.</p>
      </div>
    </div>
  );
}

export default Settings;