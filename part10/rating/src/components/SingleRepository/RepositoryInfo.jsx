import RepositoryItem from '../RepositoryItem';

const RepositoryInfo = ({ repository }) => {
  if (!repository) return null;

  return <RepositoryItem item={repository} showLink={true} />;
};

export default RepositoryInfo;
