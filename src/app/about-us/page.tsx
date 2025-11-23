import CeoMissionSection1 from '@/app/about-us/team1'
import CeoMissionSection2 from '@/app/about-us/team2'
import CeoMissionSection3 from '@/app/about-us/team3'
import Header from '@/app/Components/header'
import CeoMissionSection from '@/app/about-us/our-mission'

export default function Home() {
  return (
    <div>
        <Header/>
      <CeoMissionSection1/>
      <CeoMissionSection2/>
      <CeoMissionSection3/>
      <CeoMissionSection/>
    </div>
  );
}