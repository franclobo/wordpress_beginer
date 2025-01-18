import { useParams } from 'react-router';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import Header from '../components/header';

import { BiWorld } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';
import { CiClock2 } from 'react-icons/ci';

const About = () => {
  const { groupId } = useParams();
  const { data } = useContext(DataContext);

  const group = data.find((g) => g.id === Number(groupId));

  if (!group) return <p>Group not found</p>;

  const group_rules = [
    {
      title: 'Respect one another',
      description:
        'Everyone has a different point of view so feel free to respectfully disagree. Please be kind and courteous at all times.',
    },
    {
      title: 'Be respectful of others’ privacy',
      description:
        'Being in this group depends on our trust of one another. Some discussions may be sensitive or contain sensitive information, so what’s said in the group should stay in the group.',
    },
    {
      title: 'Copyright infringement and trademark',
      description:
        'When sharing others people’s posts, images and other content, do not infringe on their copyright or claim other people’s materials as your own.',
    },
    {
      title: 'No harassment of any kind',
      description:
        'Bullying, targeting, or attacking a member of this group is not allowed and will not be tolerated.',
    },
    {
      title: 'No sales or spam',
      description:
        'No selling to or spamming other members is allowed in this group. Anyone who does so will be subject to immediate removal.',
    },
  ];

  const chart_items = [
    {
      image: <BiWorld />,
      title: 'Public',
      description: 'Anyone can view this group.',
    },
    {
      image: <IoEyeOutline />,
      title: 'Visible',
      description: 'Shown to site visitors.',
    },
    {
      image: <CiClock2 />,
      title: 'Created',
      description: group.created_at || 'Unknown',
    },
    {
      image: <img src={group.image || 'https://via.placeholder.com/150'} alt="Group" />,
      title: group.creator || 'Unknown',
      description: 'Created by',
    },
  ];

  return (
    <div className="about">
      <Header group={group} />
      <div className="about-container">
        <div className="left-side">
          <section className="activity">
            <div className="title-activity">
              <h3>
                Group Activity: <span>Last 30 days</span>
              </h3>
            </div>
            <div className="info-activity">
              <div className="new-posts">
                <p>New Posts</p>
                <span>0</span>
              </div>
              <div className="line" />
              <div className="new-members">
                <p>New Members</p>
                <span>0</span>
              </div>
            </div>
          </section>
          <section className="about-description">
            <h3>About</h3>
            <p>{group.description || 'No description available.'}</p>
          </section>
          <section className="group-rules">
            <div className="title-activity">
              <h3>Group Rules</h3>
            </div>
            <ul className="rules">
              {group_rules.map((rule, index) => (
                <li key={`rule-${index}`}>
                  <h4>{rule.title}</h4>
                  <p>{rule.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="right-side">
          <div className="info-chart">
            <h3>Info</h3>
            <div className="item-chart">
              {chart_items.map((item, index) => (
                <div key={`chart-item-${index}`} className="chart">
                  <div className="item-image">{item.image}</div>
                  <div className="item-title">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
