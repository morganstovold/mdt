import useProfileControlsStore from './controls';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { usePermissions } from '@/store';
import { useI18nContext } from '@/i18n/i18n-react';

const ProfileControls: React.FC = () => {
  const { editing, saving, canEdit, edit, cancel, save } = useProfileControlsStore();
  const permitted = usePermissions();
  const { LL } = useI18nContext();

  return (
    <div className='flex gap-2'>
      {editing || saving ? (
        <>
          <Button className='w-full' variant='outline' onClick={cancel} disabled={saving}>
            {LL.utils.cancel()}
          </Button>
          <Button className='w-full' variant='outline' onClick={save} disabled={saving}>
            {saving && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
            {LL.utils.save()}
          </Button>
        </>
      ) : (
        <Button
          disabled={editing || !canEdit || !permitted('profiles.update')}
          className='w-full'
          variant='outline'
          onClick={edit}
        >
          {LL.utils.edit()}
        </Button>
      )}
    </div>
  );
};

export default ProfileControls;
