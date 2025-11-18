// src/pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState(""); // '', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const response = await fetch("https://carbontrack-rwxo.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setStatus(""), 4000);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-primary text-gray-100 flex flex-col items-center justify-center p-6 md:p-12 space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-accent">Contact</h1>

      <p className="text-gray-300 text-center max-w-xl leading-relaxed">
        Developed by <span className="font-semibold text-[#00C49A]">Samuel Ojima Idakwo</span>
      </p>

      <div className="flex flex-col md:flex-row gap-6 text-gray-300 text-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">📧</span>
          <a href="mailto:samuelojimaidakwo@gmail.com" className="hover:text-accent transition">
            samuelojimaidakwo@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">📞</span>
          <a href="tel:+234810751032" className="hover:text-accent transition">
            +234 810 751 032
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🔗</span>
          <a
            href="https://www.linkedin.com/in/samuel-o-idakwo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="text-gray-400 text-sm text-center max-w-md">
        Feel free to reach out for collaboration, questions, or technical inquiries.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#071827] p-6 rounded-2xl border border-slate-800 shadow-md space-y-4"
      >
        {status === "success" && (
          <div className="bg-accent text-[#021217] p-2 rounded text-center">
            Message sent successfully!
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-600 text-white p-2 rounded text-center">
            Server error. Please try again later.
          </div>
        )}

        <div>
          <label className="block text-sm text-slate-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#041226] border border-slate-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#041226] border border-slate-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 rounded bg-[#041226] border border-slate-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-accent text-[#021217] font-semibold hover:bg-[#00b37a] transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
