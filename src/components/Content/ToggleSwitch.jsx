const ToggleSwitch = ({ isOn, onToggle }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isOn}
      onChange={onToggle}
      className="sr-only peer"
    />
    <div
      className={`w-12 h-6 rounded-full transition duration-300 ${
        isOn ? "bg-purple-600" : "bg-gray-400"
      }`}
    />
    <div
      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
        isOn ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </label>
);

export default ToggleSwitch;
