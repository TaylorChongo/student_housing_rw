import BackButton from './BackButton';

const PageHeader = ({ title, fallbackPath, showBack = true }) => {
  return (
    <div className="flex items-center justify-between mb-8 shrink-0">
      <div className="flex items-center gap-6">
        {showBack && <BackButton fallbackPath={fallbackPath} />}
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h2>
      </div>
    </div>
  );
};

export default PageHeader;
