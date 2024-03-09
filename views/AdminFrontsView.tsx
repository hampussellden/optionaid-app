import Fronts from '@/components/Fronts';

const AdminFrontsView = () => {
  return (
    <section
      className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-144 min-h-[24rem]"
      title="Fronts manage section"
      id="fronts-manage-section"
    >
      <Fronts />
    </section>
  );
};
export default AdminFrontsView;
