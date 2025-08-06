import { supabase } from '../lib/supabaseClient'
import TeamMemberCard from '../components/TeamMemberCard'
import type { GetStaticProps, NextPage } from 'next'

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image_url: string;
};

type TeamProps = {
  members: TeamMember[];
};

const Team: NextPage<TeamProps> = ({ members }) => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold text-[#00F5D4] mb-8 text-center">Meet the Innovators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: members, error } = await supabase.from('team').select('*')

  if (error) {
    console.error('Error fetching team members:', error)
  }

  return {
    props: {
      members: members || [],
    },
    revalidate: 10,
  }
}

export default Team