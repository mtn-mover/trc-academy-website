'use client'

export default function ScrollToEnrollButton() {
  const scrollToEnrollment = () => {
    const enrollmentSection = document.getElementById('enrollment-section')
    if (enrollmentSection) {
      enrollmentSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <button
      onClick={scrollToEnrollment}
      className="px-8 py-4 bg-white text-trc-blue-600 font-bold rounded-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
    >
      View Investment & Enroll
    </button>
  )
}
