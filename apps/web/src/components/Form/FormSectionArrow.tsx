const FormSectionArrow = () => (
  <div className="relative flex items-center justify-center rounded-xl bg-backgroundElevated -m-3 p-1 border">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-20"
    >
      <path
        /* arrow down */
        d="M12 6L12 18M12 18L6 12M12 18L18 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default FormSectionArrow;
