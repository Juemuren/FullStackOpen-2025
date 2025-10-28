import RepositoryItem from '../RepositoryItem';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showLink={true} />;
};

export default RepositoryInfo;
