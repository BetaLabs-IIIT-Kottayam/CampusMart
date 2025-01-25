import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Sophomore, Computer Science",
      content:
        "campusMart has been a game-changer for me! I've sold my old textbooks and found great deals on electronics. The bidding system is so much fun!",
      avatar: "/avatar1.jpg",
    },
    {
      name: "Samantha Lee",
      role: "Junior, Business Administration",
      content:
        "I love how easy it is to list items for sale. The secure payment system gives me peace of mind for every transaction.",
      avatar: "/avatar2.jpg",
    },
    {
      name: "Michael Brown",
      role: "Freshman, Engineering",
      content:
        "As a new student, campusMart helped me find affordable furniture for my dorm. The community is friendly and helpful!",
      avatar: "/avatar3.jpg",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, content, avatar }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-current" />
        ))}
      </div>
    </div>
  );
}
