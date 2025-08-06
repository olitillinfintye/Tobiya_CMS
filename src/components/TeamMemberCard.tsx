type TeamMember = {
  id: number;
  name: string;
  role: string;
  image_url: string;
};

type TeamMemberCardProps = {
  member: TeamMember;
};

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00F5D4]/20">
      <img
        src={member.image_url}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-[#00F5D4]"
      />
      <h3 className="text-xl font-semibold text-white font-orbitron">{member.name}</h3>
      <p className="text-[#00F5D4]">{member.role}</p>
    </div>
  )
}