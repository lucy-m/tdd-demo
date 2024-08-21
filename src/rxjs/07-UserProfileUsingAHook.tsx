import { usePromiseFetcher } from "./02-PromiseFetcher";

// Think about how you could test this component for the given behaviour:
// 1. The component initially shows a loading state.
// 2. When all the profile data has been fetched, make sure the data is
//    shown correctly.
//
// Write tests in the following ways:
// 1. By mocking out the profile service being used in the
//    usePromiseFetcher hook.
//    - How do these tests compare to the tests for
//      05-MockableObservables component?
//    - What about if we have another component making use of the
//      usePromiseFetcher component. How will we avoid duplicating
//      the logic in the tests?
//    - Find the comment "TODO: Hook1" and follow the instructions.
//      This will simulate debouncing on the user account state.
//      How does this affect your tests?
//    - Is extracting the fetching logic into a hook actually
//      reducing the complexity of this component?
// 2. Mocking out the `usePromiseFetcher` hook. Note that I have
//    never done this and I don't even know if it is possible.
//    It may break the rules of hooks. It will probably break some
//    eslint rules. I don't know if it's possible to emulate the
//    behaviour described above by mocking a hook.

export const UserProfileUsingAHook: React.FC = () => {
  const profile = usePromiseFetcher("some-id");

  return <div>{JSON.stringify(profile)}</div>;
};
