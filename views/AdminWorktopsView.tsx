import Worktops from '@/components/Worktops';

const AdminWorktopsView = () => {
  return (
    <section
      className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-144 min-h-[24rem]"
      title="Worktops manage section"
      id="worktops-manage-section"
    >
      <Worktops />
    </section>
  );
};
export default AdminWorktopsView;
