import { Separator } from '@/components/ui/separator';
import ProfilePicture from './ProfilePicture';
import { Icons } from '@/components/icons';
import ProfileControls from './ProfileControls';
import Editor from '@/components/tablet/editor';
import useProfileStore from './store';
import useProfileControlsStore from './controls';
import { formatPhoneNumber } from '@/lib/utils';
import { usePermissions } from '@/store';
import { useI18nContext } from '@/i18n/i18n-react';

const ProfileDetails: React.FC = () => {
  const { profile, setNotes } = useProfileStore();
  const editing = useProfileControlsStore((state) => state.editing);
  const permitted = usePermissions();
  const { LL } = useI18nContext();

  return (
    <div className='flex flex-col w-full overflow-hidden h-full gap-2'>
      <div className='flex gap-2'>
        <ProfilePicture />
        <Separator orientation='vertical' />
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between items-end text-neutral-400 px-2'>
            <div className='text-xl capitalize text-neutral-200'>
              {profile.firstname} {profile.lastname}
            </div>
            <span>{profile.citizenid}</span>
          </div>
          <Separator />
          <div className='flex flex-col justify-between w-full h-full text-neutral-400 p-2 text-sm'>
            <div className='flex flex-col gap-2 capitalize'>
              <div className='flex items-center gap-2 py-1'>
                <Icons.briefcase size='16px' />
                <Separator orientation='vertical' /> <span>{profile.job}</span>
              </div>
<<<<<<< HEAD
              {profile.phone && permitted('profiles.view.hidden') ? (
                <div className='flex items-center gap-2 py-1'>
                  <Icons.phone size='16px' />
                  <Separator orientation='vertical' />
                  <span>{formatPhoneNumber(profile.phone)}</span>
=======
              {permitted('profiles.view.hidden') ? (
                <div className='flex items-center gap-2 py-1'>
                  <Icons.phone size='16px' />
                  <Separator orientation='vertical' />
                  <span>{formatPhoneNumber(profile.phone || "0000000000")}</span>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                </div>
              ) : (
                <div className='flex items-center gap-2 py-1 text-red-400/90'>
                  <Icons.phone size='16px' />
                  <Separator orientation='vertical' />
                  <span>{LL.utils.hidden()}</span>
                </div>
              )}
              <div className='flex items-center gap-2 py-1'>
                <Icons.cake size='16px' />
                <Separator orientation='vertical' />
                <span>{new Date(profile.dob).toLocaleDateString()}</span>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <Icons.user size='16px' />
                <Separator orientation='vertical' />
                <span>{Number(profile.gender) ? 'Female' : 'Male'}</span>
              </div>
              <div>
                {LL.utils.lastUpdated()} {new Date(profile.updatedAt!).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <Editor onChange={setNotes} editable={editing} content={profile.notes} />
      <ProfileControls />
    </div>
  );
};

export default ProfileDetails;
