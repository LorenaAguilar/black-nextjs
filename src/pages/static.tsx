import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { Col, Container, Row } from "reactstrap";
import { ReactNode, useEffect, useState } from "react";

interface ApiResponse {
  name: string;
  timestamp: Date;
}

//É chamada somente na hora do build
//Por conta disso é melhor para dados que não mudam com frequência
export const getStaticProps: GetStaticProps = async () => {
  const staticData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hello`
  ).then((res) => res.json());

  return {
    props: {
      staticData,
    },
    revalidate: 10, //Tempo em segundos para revalidar (regenerar) a página
  };
};

const Static: NextPage = (props: {
  children?: ReactNode;
  staticData?: ApiResponse;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("/api/hello").then((res) => res.json());
    setClientSideData(data);
  };
  return (
    <Container tag="main">
      <h1 className="my-5">Como funcionam as renderizações do Next.js</h1>

      <Row>
        <Col>
          <h3>Gerado estaticamente durante o build:</h3>
          <h2>{props.staticData?.timestamp.toString()}</h2>
        </Col>

        <Col>
          <h3>Gerado no cliente:</h3>
          <h2>{clientSideData?.timestamp.toString()}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Static;
