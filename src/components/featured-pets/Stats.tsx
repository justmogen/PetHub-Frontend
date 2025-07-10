const Stats = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-3xl font-bold mb-2 text-primary">500+</div>
        <p className="text-muted-foreground">Happy Families</p>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-2 text-secondary">100%</div>
        <p className="text-muted-foreground">Health Certified</p>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-2 text-accent">24/7</div>
        <p className="text-muted-foreground">Support Available</p>
      </div>
    </div>
  );
};

export default Stats;
