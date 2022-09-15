import { useRouter } from "next/router";

export default function VoucherForm() {
  const { query } = useRouter();
  const { id } = query;

  const onSubmit = () => {
    console.log(id);
  };

  return (
    <div>
      <p>Form page</p>
      <button onClick={onSubmit}>click</button>
    </div>
  );
}
